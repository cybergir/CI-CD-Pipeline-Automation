from flask_restful import Api, Resource
from flask import request, jsonify
from .models import db, Product, Sale, User
from .extensions import jwt, ma
from .utils import validate_admin_access, custom_response
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, get_jwt
)

api = Api()

# Schemas
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'price', 'stock', 'category')

class SaleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'product_id', 'quantity', 'total_price', 'sale_date')

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
sale_schema = SaleSchema()
sales_schema = SaleSchema(many=True)

# Resources
class ProductList(Resource):
    @jwt_required()
    def get(self):
        products = Product.query.all()
        return products_schema.dump(products)

    @jwt_required()
    @validate_admin_access
    def post(self):
        data = request.get_json()
        new_product = Product(
            name=data['name'],
            price=data['price'],
            stock=data.get('stock', 0),
            category=data.get('category', 'general')
        )
        db.session.add(new_product)
        db.session.commit()
        return product_schema.dump(new_product), 201

class SaleResource(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        product = Product.query.get(data['product_id'])
        
        if not product or product.stock < data['quantity']:
            return custom_response('Invalid product or insufficient stock', 400)
        
        total_price = product.price * data['quantity']
        new_sale = Sale(
            product_id=data['product_id'],
            quantity=data['quantity'],
            total_price=total_price,
            cashier_id=get_jwt_identity()
        )
        
        product.stock -= data['quantity']
        db.session.add(new_sale)
        db.session.commit()
        
        return sale_schema.dump(new_sale), 201

class AuthLogin(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.id)
            return {'access_token': access_token}, 200
        
        return custom_response('Invalid credentials', 401)

class AuthRegister(Resource):
    @jwt_required()
    @validate_admin_access
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first():
            return custom_response('Username already exists', 400)
            
        new_user = User(
            username=data['username'],
            email=data['email'],
            is_admin=data.get('is_admin', False)
        )
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        
        return {'message': 'User created successfully'}, 201

# Register resources
api.add_resource(ProductList, '/api/products')
api.add_resource(SaleResource, '/api/sales')
api.add_resource(AuthLogin, '/api/auth/login')
api.add_resource(AuthRegister, '/api/auth/register')
