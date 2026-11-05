import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Mail, MapPin, Send, CheckCircle2, Binary, Linkedin, Github, Award, GraduationCap, Briefcase, ExternalLink } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, submitContactMessage } = useBlog();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitContactMessage(form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="about" className="py-24 border-b border-zinc-200 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Statement of Purpose & Intellectual Journey */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600 mb-3">
            <GraduationCap className="w-4 h-4 text-zinc-700" />
            <span>Academic Statement & Research Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight leading-[1.12] mb-8 [text-wrap:balance]">
            "What does it mean for a model to be right?"
          </h2>
          <div className="space-y-6 text-zinc-700 text-base sm:text-lg leading-relaxed font-sans">
            <p>
              The tools felt reassuringly familiar at first—probability, optimisation, stochastic models—yet the problems they were being asked to solve were not familiar in the slightest. Markets, unlike the Olympiad problems that first drew me to mathematics, refuse to remain static; every new piece of information alters the state of the system, and forces the model attempting to describe it to adapt continuously while still, somehow, remaining mathematically coherent.
            </p>
            <p>
              It is this tension, between elegant theory on one hand and an unpredictable reality on the other, that I find intellectually compelling above almost everything else in mathematics. Throughout my studies and industry work, the question I find myself asking of a model is rarely whether it predicts accurately, but <span className="font-semibold text-zinc-950">why it succeeds in one setting and fails, sometimes rather badly, in another</span>.
            </p>
            <p>
              Answering that question properly requires stochastic analysis and mathematical finance studied formally, and with real rigour—particularly in problems of market microstructure, optimal execution, and liquidity, where trading decisions that look deceptively simple on the surface conceal underneath highly complex mathematical systems.
            </p>
          </div>
        </div>

        {/* Pillars: Olympiad, Michigan, PETRONAS, WorldQuant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Award className="w-5 h-5 text-zinc-800" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 block">
              Foundation
            </span>
            <h3 className="font-bold text-zinc-950 text-base">International Math Olympiad (IMO)</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Represented Malaysia at the IMO & competed in ACM-ICPC. Instilled an approach to problem-solving built on logical rigour, creativity, and constructing new perspectives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900">
              <GraduationCap className="w-5 h-5 text-zinc-800" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 block">
              Education
            </span>
            <h3 className="font-bold text-zinc-950 text-base">University of Michigan</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Triple major in Actuarial Mathematics, Statistics, and Data Science, with a Ross School of Business minor. Studied uncertainty from probability, inference, and large-scale computation angles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Briefcase className="w-5 h-5 text-zinc-800" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 block">
              Industry Experience
            </span>
            <h3 className="font-bold text-zinc-950 text-base">PETRONAS LNG Trading Desk</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Trading Risk Analyst pricing complex derivatives and building quantitative risk models for a multi-billion-dollar portfolio, following high-frequency industrial time-series modeling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Binary className="w-5 h-5 text-zinc-800" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 block">
              Systematic Research
            </span>
            <h3 className="font-bold text-zinc-950 text-base">WorldQuant Research (Top 1%)</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              International Quant Championship Global Top 1% and WorldQuant BRAIN researcher, testing hypotheses and building automated tools to accelerate systematic alpha research.
            </p>
          </div>
        </div>

        {/* Profile Card & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-zinc-200">
          {/* Left: Bio, Avatar, and Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-5">
              <img
                src={data.profile.avatarUrl}
                alt={data.profile.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-zinc-300 shadow-xs"
              />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 block mb-0.5">
                  Author & Researcher
                </span>
                <h3 className="text-2xl font-bold text-zinc-950">
                  {data.profile.name}
                </h3>
                <p className="text-xs text-zinc-600 flex items-center gap-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{data.profile.location}</span>
                </p>
              </div>
            </div>

            <p className="text-zinc-600 text-sm leading-relaxed font-sans">
              {data.profile.bio}
            </p>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={data.profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-md text-xs font-mono text-zinc-800 transition-colors shadow-2xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-700" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href={`mailto:${data.profile.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-md text-xs font-mono text-zinc-800 transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-600" />
                <span>{data.profile.email}</span>
              </a>

              {data.profile.socialLinks.github && (
                <a
                  href={data.profile.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-md text-xs font-mono text-zinc-800 transition-colors shadow-2xs"
                >
                  <Github className="w-3.5 h-3.5 text-zinc-700" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* The Communication Invariant */}
            <div className="p-4 bg-zinc-100 rounded-lg border border-zinc-200 text-xs font-sans text-zinc-700 space-y-1">
              <span className="font-mono font-semibold uppercase text-[10px] text-zinc-600 block">
                The Communication Invariant:
              </span>
              <p className="italic">
                "An idea you cannot explain clearly to someone outside your field is an idea you do not yet understand completely yourself."
              </p>
            </div>
          </div>

          {/* Right: Direct Correspondence Form */}
          <div id="contact" className="lg:col-span-7 bg-white border border-zinc-300/80 rounded-xl p-8 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 block mb-2">
              Academic & Professional Inquiries
            </span>
            <h3 className="text-2xl font-bold text-zinc-950 mb-2">
              Send a Note or Discussion Prompt
            </h3>
            <p className="text-xs text-zinc-600 mb-6 font-sans leading-relaxed">
              For research collaborations, discussions on stochastic modeling and market microstructure, or academic correspondence, leave a message below.
            </p>

            {submitted ? (
              <div className="p-6 bg-zinc-50 border border-zinc-300 rounded-md text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-zinc-900 mx-auto" />
                <p className="text-sm font-bold text-zinc-950">Message Delivered</p>
                <p className="text-xs text-zinc-600 font-sans">
                  Thank you! Your note has been delivered to Muhammad Hafizudeen's dashboard inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Stochastic modeling / Paper discussion / Opportunity"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 uppercase mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your note or question..."
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-zinc-950 hover:bg-zinc-800 text-zinc-100 font-mono text-xs uppercase tracking-widest rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
