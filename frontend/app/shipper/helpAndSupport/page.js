"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function HelpAndSupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  const [faqs] = useState([
    {
      q: "How to upload documents?",
      a: 'Go to Profile → Documents and click "Submit for Verification" to upload your License, RC, Insurance, Permit, and PAN.',
    },
    {
      q: "What is the verification time?",
      a: "Verification usually takes 24–48 hours. You will be notified once admin approves.",
    },
    {
      q: "How do I withdraw earnings?",
      a: "Open Wallet from the Profile and click Withdraw. Follow the on-screen steps to add your bank account.",
    },
    {
      q: "How to contact support?",
      a: "Call 1800123456 or email support@freightshare.example during help hours.",
    },
    {
      q: "Can I update my truck details?",
      a: "Yes — go to Edit Profile → Vehicle and update truck name and capacity.",
    },
  ]);

  const [openFaq, setOpenFaq] = useState(null);

  function handleAttach(e) {
    const f = e.target.files?.[0];
    setAttachment(f || null);
  }

  function submitTicket(e) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setStatusMsg("Please fill subject and message.");
      return;
    }
    const newTicket = {
      id: Date.now(),
      subject,
      message,
      attachmentName: attachment?.name || null,
      date: new Date().toLocaleString(),
      status: "Open",
    };
    setTickets((t) => [newTicket, ...t]);
    setSubject("");
    setMessage("");
    setAttachment(null);
    setStatusMsg("Ticket submitted — our support will reach out soon.");
    setTimeout(() => setStatusMsg(""), 4000);
  }

  return (
    <div className="min-h-screen bg-[#faf7ff]">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-semibold text-slate-800">
                  Help & Support
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                  We&apos;re here to help — raise a ticket, call or email
                  support.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {/* <a
                    href="/shipper/profile"
                    className="px-3 py-2 bg-white border rounded-lg text-indigo-600 text-sm hover:shadow"
                  >
                    Profile
                  </a>
                  <a
                    href="/shipper/dashboard"
                    className="px-3 py-2 bg-white border rounded-lg text-indigo-600 text-sm hover:shadow"
                  >
                    Dashboard
                  </a> */}
                  <a
                    href="mailto:support@freightshare.example"
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm"
                  >
                    Email Support
                  </a>
                </div>
              </div>

              <div className="w-48 grid grid-cols-1 gap-3">
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 text-center border">
                  <div className="text-sm text-gray-500">Help Hours</div>
                  <div className="font-semibold text-lg text-indigo-600">
                    9am — 9pm
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 text-center border">
                  <div className="text-sm text-gray-500">Avg Response</div>
                  <div className="font-semibold text-lg text-emerald-600">
                    ~2 hours
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="mt-6 grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-7 space-y-6">
                {/* FAQ Section */}
                <div className="bg-white rounded-2xl p-6 shadow-md border">
                  <div className="grid grid-cols-2 gap-6 items-start">
                    <div className="pr-2">
                      <h2 className="text-4xl font-bold text-slate-800">
                        Frequently asked questions
                      </h2>
                      <p className="mt-4 text-sm text-slate-500">
                        Find quick answers to common questions about documents,
                        verification, payments and using the app.
                      </p>

                      <div className="mt-8 bg-gradient-to-br from-purple-50 to-white rounded-lg p-6 border shadow-sm">
                        <h4 className="text-lg font-medium text-slate-800">
                          Still have questions?
                        </h4>
                        <p className="text-sm text-slate-600 mt-2">
                          Can’t find the answer? Send us an email and we’ll get
                          back to you as soon as possible.
                        </p>
                        <div className="mt-4">
                          <a
                            href="mailto:support@freightshare.example"
                            className="inline-block px-5 py-3 rounded-md bg-gradient-to-r from-purple-600 to-violet-500 text-white font-medium"
                          >
                            Send email
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="space-y-3">
                        {faqs.map((f, i) => (
                          <div
                            key={i}
                            className="bg-white border rounded-lg shadow-sm"
                          >
                            <div className="flex items-center justify-between p-4">
                              <div className="text-sm font-medium text-slate-800">
                                {f.q}
                              </div>
                              <button
                                onClick={() =>
                                  setOpenFaq(openFaq === i ? null : i)
                                }
                                className="ml-4"
                              >
                                <span
                                  className={`w-9 h-9 rounded-full inline-flex items-center justify-center ${
                                    openFaq === i
                                      ? "bg-purple-600 text-white"
                                      : "bg-purple-50 text-purple-600"
                                  }`}
                                >
                                  {openFaq === i ? "−" : "+"}
                                </span>
                              </button>
                            </div>
                            {openFaq === i && (
                              <div className="p-4 pt-0 text-sm text-slate-600 border-t">
                                {f.a}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-2xl p-6 shadow-md border">
                  <h3 className="text-lg font-medium text-slate-800">
                    Contact Support
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    You can call, email, or raise a ticket below. Fastest way is
                    to call during help hours.
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <a
                      href="tel:1800123456"
                      className="flex items-center justify-center gap-2 py-3 bg-white border rounded-lg text-indigo-600 hover:shadow"
                    >
                      <span className="text-lg">📞</span>
                      <span className="text-sm">Call</span>
                    </a>
                    <a
                      href="mailto:support@freightshare.example"
                      className="flex items-center justify-center gap-2 py-3 bg-white border rounded-lg text-indigo-600 hover:shadow"
                    >
                      <span className="text-lg">✉️</span>
                      <span className="text-sm">Email</span>
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "support@freightshare.example"
                        );
                        alert("Email copied");
                      }}
                      className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg hover:shadow"
                    >
                      <span className="text-sm">Copy Email</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-5 space-y-6">
                {/* Recent Tickets */}
                <div className="bg-white rounded-2xl p-4 shadow-md border">
                  <h4 className="font-medium text-slate-800">Recent Tickets</h4>
                  <div className="mt-3 space-y-3 max-h-64 overflow-auto">
                    {tickets.length === 0 && (
                      <div className="text-sm text-slate-500">
                        No tickets yet. Submit a ticket from the form.
                      </div>
                    )}

                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-gradient-to-r from-amber-50 to-white rounded-lg flex flex-col gap-1 border"
                      >
                        <div className="font-medium">{t.subject}</div>
                        <div className="text-xs text-slate-500">
                          {t.date} • {t.attachmentName || "No attachment"}
                        </div>
                        <div className="text-sm text-slate-700">
                          {t.message}
                        </div>
                        <div
                          className={`text-xs mt-2 ${
                            t.status === "Open"
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          Status: {t.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raise Ticket */}
                <div className="bg-white rounded-2xl p-4 shadow-md border">
                  <h3 className="text-lg font-medium text-slate-800">
                    Raise a Ticket
                  </h3>

                  <form onSubmit={submitTicket} className="mt-4 space-y-3">
                    <div>
                      <label className="text-sm text-slate-600">Subject</label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-2 w-full border rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-slate-600">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="mt-2 w-full border rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-slate-600">
                        Attachment (optional)
                      </label>
                      <div className="mt-2 border rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm text-slate-500 truncate">
                          {attachment?.name || "No file selected"}
                        </span>
                        <input
                          id="hs-attach"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleAttach}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("hs-attach").click()
                          }
                          className="px-3 py-1 bg-white border rounded"
                        >
                          Choose
                        </button>
                      </div>
                    </div>

                    {statusMsg && (
                      <div className="text-sm text-emerald-600">
                        {statusMsg}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
                      >
                        Submit Ticket
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubject("");
                          setMessage("");
                          setAttachment(null);
                        }}
                        className="px-3 py-2 bg-white border rounded-lg"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
