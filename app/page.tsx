"use client";

import { useMemo, useState } from "react";

const deals = {
  single: { label: "1 PIECE", product: 1250, delivery: 120 },
  pair: { label: "2 PIECES", product: 2190, delivery: 0 },
} as const;

type DealKey = keyof typeof deals;

export default function Home() {
  const [deal, setDeal] = useState<DealKey>("pair");
  const [form, setForm] = useState({ name: "", phone: "", address: "", district: "", size: "", color: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const selected = deals[deal];
  const total = useMemo(() => selected.product + selected.delivery, [selected]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, deal, total }),
      });
      if (!response.ok) throw new Error("Order failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <div className="topbar">সারা বাংলাদেশে Cash on Delivery · Premium denim · সহজ অর্ডার</div>

      <header className="site-header container">
        <a className="logo" href="#top" aria-label="Fashion Factory home">
          <span>FASHION</span> FACTORY
        </a>
        <a className="header-cta" href="#order">ORDER NOW</a>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">PREMIUM DENIM / BOOTCUT</p>
          <h1>Premium Bootcut Pant</h1>
          <p className="hero-lead">Export-quality denim, made for everyday comfort and a clean fit.</p>
          <div className="price-stack">
            <span className="regular-price">Regular Price ৳1,750</span>
            <strong>Offer Price ৳1,250</strong>
          </div>
          <div className="hero-deal"><b>2 Pieces — ৳2,190 + FREE DELIVERY</b><span>Save ৳310</span></div>
          <a className="primary-cta" href="#order">ORDER NOW <span>→</span></a>
          <p className="microcopy">ভালো product, পরিষ্কার কথা, বাড়তি নাটক নয়।</p>
        </div>

        <div className="hero-visual" aria-label="Product image area">
          <div className="image-placeholder hero-placeholder">
            <span>PRODUCT IMAGE</span>
            <small>Upload bootcut hero photo</small>
          </div>
          <div className="thumbs">
            {[
              ["GREY", "#696969"],
              ["BLUE", "#244b6b"],
              ["CLOSE-UP", "#8c6f54"],
              ["FULL VIEW", "#343434"],
            ].map(([label, tone]) => (
              <div className="thumb" key={label} style={{ background: `linear-gradient(145deg, ${tone}, #111)` }}>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust container">
        <div className="trust-intro">
          <p className="eyebrow">SHOP WITH CONFIDENCE</p>
          <h2>Online হোক বা showroom—আপনার কেনাকাটা হোক নিশ্চিন্তে।</h2>
          <p>Fashion Factory-এর 1,400 sq. ft. showroom রয়েছে। Online-এর পাশাপাশি showroom-এও আমাদের collection পাওয়া যাচ্ছে।</p>
        </div>
        <div className="trust-grid">
          <div><strong>1,400 sq. ft.</strong><span>Showroom</span></div>
          <div><strong>Cash on Delivery</strong><span>সারা বাংলাদেশে</span></div>
          <div><strong>Product Check</strong><span>সম্ভব হলে delivery man-এর সামনে</span></div>
        </div>
      </section>

      <section className="benefits section container">
        <div className="section-heading"><p className="eyebrow">THE BOOTCUT</p><h2>কেন এই Bootcut?</h2><p>প্রতিদিনের ব্যবহার মাথায় রেখে fabric, fit আর construction—তিনটাকেই গুরুত্ব দেওয়া হয়েছে।</p></div>
        <div className="benefit-grid">
          <article><span>01</span><h3>Premium Fabric</h3><p><b>98% Cotton + 2% Spandex</b><br/>13–13.5 Oz premium denim<br/>Soft & stretchable</p></article>
          <article><span>02</span><h3>Comfortable Fit</h3><p><b>Semi-Slim Bootcut Fit</b><br/>Regular wear থেকে special occasion—দুই ক্ষেত্রেই মানানসই।</p></article>
          <article><span>03</span><h3>Built to Last</h3><p><b>Strong + double stitching</b><br/>Everyday use-এর জন্য durable construction.</p></article>
          <article><span>04</span><h3>Functional Pocket</h3><p><b>Deep & practical pockets</b><br/>Phone, wallet ও প্রয়োজনীয় জিনিস রাখার জন্য।</p></article>
        </div>
      </section>

      <section className="comfort-band">
        <div className="container band-grid">
          <div><p className="eyebrow">COMFORT FIRST</p><h2>নরম ও breathable fabric, দীর্ঘ সময় পরার জন্য আরামদায়ক।</h2></div>
          <div className="claim"><span>COLOR FAST</span><b>দৈনন্দিন ব্যবহারে রং ধরে রাখার জন্য তৈরি।</b></div>
        </div>
      </section>

      <section className="offers section container">
        <div className="section-heading"><p className="eyebrow">SIMPLE, CLEAR PRICING</p><h2>Choose Your Deal</h2><p>আপনার প্রয়োজন অনুযায়ী package বেছে নিন।</p></div>
        <div className="offer-grid">
          {(Object.entries(deals) as [DealKey, (typeof deals)[DealKey]][]).map(([key, item]) => (
            <button key={key} className={`offer-card ${deal === key ? "selected" : ""}`} onClick={() => setDeal(key)}>
              {key === "pair" && <span className="best">BEST VALUE</span>}
              <span>{item.label}</span>
              <strong>৳{item.product.toLocaleString("en-BD")}</strong>
              <small>{item.delivery ? "Delivery charge applicable" : "FREE DELIVERY"}</small>
              {key === "pair" && <em>Save ৳310</em>}
            </button>
          ))}
        </div>
      </section>

      <section className="reviews section container">
        <div className="section-heading"><p className="eyebrow">SOCIAL PROOF</p><h2>Customers Love It</h2><p>Real customer feedback should live here—কোনও fake review নয়।</p></div>
        <div className="review-grid">
          {["Customer photo", "Customer photo", "Customer photo"].map((label, index) => (
            <article className="review-card" key={index}><div className="review-photo">{label}</div><div><div className="stars">★★★★★</div><p>“Real customer review goes here. Product fit, quality and delivery experience নিয়ে ছোট, বিশ্বাসযোগ্য feedback.”</p><strong>Customer {index + 1}</strong></div></article>
          ))}
        </div>
      </section>

      <section className="cod-strip"><div className="container cod-inner"><span>COD</span><div><h2>Cash on Delivery — Across Bangladesh</h2><p>Product হাতে পেয়ে দেখে তারপর Delivery Man-কে payment করুন।</p></div></div></section>

      <section id="order" className="order-section section container">
        <div className="order-copy"><p className="eyebrow">READY WHEN YOU ARE</p><h2>আপনার order confirm করুন</h2><p>Package: <b>{selected.label}</b><br/>Product: ৳{selected.product.toLocaleString("en-BD")} · Delivery: {selected.delivery ? `৳${selected.delivery}` : "FREE"}</p><div className="order-total"><span>Total</span><strong>৳{total.toLocaleString("en-BD")}</strong></div></div>
        <form onSubmit={submitOrder} className="order-form">
          {[['name','আপনার নাম'],['phone','মোবাইল নম্বর'],['address','ঠিকানা'],['district','জেলা']].map(([key,label]) => <label key={key}>{label}<input required value={form[key as keyof typeof form]} onChange={(e) => updateField(key as keyof typeof form, e.target.value)} /></label>)}
          <div className="two-col"><label>Size<select required value={form.size} onChange={(e) => updateField("size", e.target.value)}><option value="">Select</option><option>30</option><option>32</option><option>34</option><option>36</option><option>38</option><option>40</option></select></label><label>Color<select required value={form.color} onChange={(e) => updateField("color", e.target.value)}><option value="">Select</option><option>Grey</option><option>Blue</option></select></label></div>
          <button className="primary-cta form-submit" disabled={status === "loading"}>{status === "loading" ? "SUBMITTING…" : "ORDER NOW"} <span>→</span></button>
          {status === "success" && <p className="status success">ধন্যবাদ! আপনার order request পৌঁছেছে।</p>}
          {status === "error" && <p className="status error">Order submit হয়নি। Supabase connection/env setup check করুন।</p>}
        </form>
      </section>

      <footer className="footer"><div className="container"><div className="footer-mark">FASHION FACTORY</div><p>For men who know what they like.</p><div className="footer-sub"><span>Fashion Factory</span><span>Men · Women · Baby</span></div></div></footer>
    </main>
  );
}
