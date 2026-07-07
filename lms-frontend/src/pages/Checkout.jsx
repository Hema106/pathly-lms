import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { getCourse } from "../data/courses";
import Button from "../components/ui/Button";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, subtotal, clearCart, removeFromCart } = useCart();
  const { enroll } = useEnrollment();
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  const buyNowId = location.state?.buyNow;
  const buyNowCourse = buyNowId ? getCourse(buyNowId) : null;
  const courseList = buyNowCourse ? [buyNowCourse] : items;
  const total = buyNowCourse ? buyNowCourse.price : subtotal;

  if (courseList.length === 0 && !done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Nothing to check out</h1>
        <p className="text-inkSoft mb-6">Add a course to your cart first.</p>
        <Link to="/courses"><Button size="lg">Browse courses</Button></Link>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      enroll(courseList.map((c) => c.id));
      if (!buyNowCourse) clearCart();
      else removeFromCart(buyNowCourse.id);
      setPlacing(false);
      setDone(true);
    }, 900);
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle2 size={48} className="mx-auto text-progress mb-4" />
        <h1 className="font-display font-bold text-2xl text-ink mb-2">You're enrolled!</h1>
        <p className="text-inkSoft mb-6">Your course{courseList.length > 1 ? "s are" : " is"} ready in My Learning.</p>
        <Button size="lg" onClick={() => navigate("/my-learning")}>Go to My Learning</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-10 grid lg:grid-cols-[1fr_340px] gap-10">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink mb-6">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="space-y-5">
          <div>
            <h2 className="font-display font-semibold text-ink mb-3">Payment method</h2>
            <div className="border border-border rounded-lg p-4 space-y-4">
              <label className="flex flex-col gap-1.5 text-sm">
                Card number
                <input required placeholder="4242 4242 4242 4242" className="border border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-sm">
                  Expiry
                  <input required placeholder="MM/YY" className="border border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  CVC
                  <input required placeholder="123" className="border border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm">
                Name on card
                <input required placeholder="Full name" className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full" variant="accent" size="lg" disabled={placing}>
            <Lock size={15} /> {placing ? "Processing…" : `Pay ₹${total}`}
          </Button>
          <p className="text-xs text-inkSoft text-center">This is a demo checkout — no real payment is processed.</p>
        </form>
      </div>

      <div>
        <div className="border border-border rounded-lg p-5 sticky top-24">
          <h2 className="font-display font-semibold text-ink mb-4">Order summary</h2>
          <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
            {courseList.map((c) => (
              <div key={c.id} className="flex justify-between gap-3 text-sm">
                <span className="text-inkSoft line-clamp-2">{c.title}</span>
                <span className="font-mono shrink-0">₹{c.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-display font-bold text-ink">
            <span>Total</span>
            <span className="font-mono">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
