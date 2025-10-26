import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCopy, FaRegFileAlt, FaShoppingBag } from "react-icons/fa";

export default function Success({
  orderId = "ORD-12345",
  total = "₹1,499.00",
  items = [{ name: "Stylish Shirt", qty: 1, price: "₹699" }, { name: "Sneakers", qty: 1, price: "₹800" }],
  eta = "2-3 business days",
  onContinue = () => window.location.replace("/"),
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const downloadReceipt = () => {
    setDownloading(true);
    const lines = [];
    lines.push("Order Receipt\n");
    lines.push(`Order ID: ${orderId}`);
    lines.push(`Total: ${total}`);
    lines.push(`ETA: ${eta}\n`);
    lines.push("Items:");
    items.forEach((it) => lines.push(`- ${it.name} x${it.qty} — ${it.price}`));
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${orderId}_receipt.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 600);
  };

  return (
    <div className="w-full min-h-[80vh] p-6 bg-amber-200 flex items-center justify-center">
      <motion.div
        ref={cardRef}
        drag
        dragConstraints={cardRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative max-w-md w-full bg-gradient-to-br from-green-900/95 to-green-800/80 text-white rounded-2xl shadow-2xl p-6 overflow-hidden"
        aria-live="polite"
      >
        {/* soft glowing rings for depth */}
        <div className="absolute -left-10 -top-10 w-56 h-56 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-8 bottom-4 w-40 h-40 bg-white/3 rounded-full blur-2xl pointer-events-none" />

        {/* Confetti (subtle) */}
        <div aria-hidden className="pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ y: -10, opacity: 0, scale: 0.6, rotate: 0 }}
              animate={{ y: [ -10, -30, -8 ], opacity: [0, 1, 0.6], rotate: [0, 45, -20] }}
              transition={{ delay: 0.1 + i * 0.03, repeat: 0, duration: 1.2 }}
              className={`absolute w-2 h-2 rounded-sm bg-white/60`}
              style={{ left: `${8 + i * 8}%`, top: `${6 + (i % 3) * 2}%` }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.45 }}
            className="flex-none bg-white/10 p-3 rounded-full"
          >
            <FaCheckCircle size={44} className="text-green-200" />
          </motion.div>

          <div>
            <motion.h2
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-2xl font-extrabold"
            >
              Order Confirmed
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-green-200/90"
            >
              Thank you — your purchase was successful.
            </motion.p>
          </div>
        </div>

        <div className="mt-5 bg-white/6 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-3">
              <span className="font-mono bg-white/5 px-2 py-1 rounded">{orderId}</span>
              <button
                onClick={copyOrderId}
                aria-label="Copy order id"
                className="text-xs px-2 py-1 rounded-md bg-white/4 hover:bg-white/6 transition"
              >
                <FaCopy className="inline-block mr-1" /> {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="text-right">
              <div className="text-[13px]">Status</div>
              <div className="text-sm font-semibold text-green-200">Confirmed</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-xs text-green-200/90">Estimated delivery</div>
              <div className="font-medium">{eta}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-green-200/90">Total paid</div>
              <div className="font-semibold text-lg">{total}</div>
            </div>
          </div>

          {/* items preview */}
          <div className="mt-3 pt-3 border-t border-white/6">
            {items.slice(0, 3).map((it, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm py-1">
                <div className="flex items-center gap-2">
                  <FaShoppingBag className="opacity-80" />
                  <div className="min-w-0">
                    <div className="truncate font-medium">{it.name}</div>
                    <div className="text-xs text-green-200/70">Qty {it.qty}</div>
                  </div>
                </div>
                <div className="font-mono">{it.price}</div>
              </div>
            ))}
            {items.length > 3 && (
              <div className="text-xs text-green-200/80 mt-2">+{items.length - 3} more items</div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="flex-1 bg-white text-green-900 rounded-full py-2 font-semibold shadow-sm hover:bg-white/90 transition"
          >
            Continue Shopping
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadReceipt}
            disabled={downloading}
            className="flex-none bg-transparent border border-white/10 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/4 transition"
          >
            <FaRegFileAlt className="inline-block mr-2" /> {downloading ? "Preparing..." : "Download"}
          </motion.button>
        </div>

        <footer className="mt-4 text-xs text-green-200/80">
          You can view order details in <span className="underline">My Orders</span> — we sent a confirmation to your email.
        </footer>
      </motion.div>
    </div>
  );
}
