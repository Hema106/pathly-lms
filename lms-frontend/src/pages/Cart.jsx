import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getCategory } from "../data/categories";
import Button from "../components/ui/Button";

export default function Cart() {
  const { items, removeFromCart, subtotal, originalTotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-inkSoft mb-4" />
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Your cart is empty</h1>
        <p className="text-inkSoft mb-6">Keep clicking, something worth learning is out there.</p>
        <Link to="/courses"><Button size="lg">Browse courses</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 grid lg:grid-cols-[1fr_320px] gap-10">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink mb-1">My Cart</h1>
        <p className="text-inkSoft text-sm mb-6">{items.length} course{items.length !== 1 ? "s" : ""} in cart</p>

        <div className="space-y-4">
          {items.map((course) => {
            const cat = getCategory(course.category);
            return (
              <div key={course.id} className="flex gap-4 border-b border-border pb-4">
                <Link to={`/courses/${course.id}`} className="shrink-0">
                  <img src={course.thumb} alt="" className="w-32 aspect-video object-cover rounded-md" />
                </Link>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: cat?.spine }}>{cat?.name}</span>
                  <Link to={`/courses/${course.id}`}>
                    <h3 className="font-display font-semibold text-ink text-sm mb-1 hover:text-primary line-clamp-2">{course.title}</h3>
                  </Link>
                  <p className="text-xs text-inkSoft mb-2">{course.instructor}</p>
                  <button onClick={() => removeFromCart(course.id)} className="flex items-center gap-1.5 text-xs font-semibold text-coral hover:underline">
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
                <div className="text-right shrink-0 font-mono">
                  <p className="font-semibold text-ink">₹{course.price}</p>
                  <p className="text-xs text-inkSoft line-through">₹{course.originalPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="border border-border rounded-lg p-5 sticky top-24">
          <p className="text-sm text-inkSoft mb-1">Total</p>
          <div className="flex items-baseline gap-2 font-mono mb-1">
            <span className="font-display font-bold text-3xl text-ink">₹{subtotal}</span>
          </div>
          <p className="text-xs text-inkSoft line-through font-mono mb-5">₹{originalTotal}</p>
          <Button className="w-full" variant="accent" size="lg" onClick={() => navigate("/checkout")}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
