export default function Cart({ items }) {
    return (
      <div className="cart">
        <h2>Cart Items</h2>
        {items?.length > 0 ? (
          <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    );
  }