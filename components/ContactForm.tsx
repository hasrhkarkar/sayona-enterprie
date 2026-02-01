"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const isValid = validate();
    if (!isValid) {
      setStatus('idle');
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to send');
      setStatus('success');
      setName(''); setEmail(''); setSubject(''); setMessage('');
      setErrors({});
    } catch (err: any) {
      setStatus('error');
      setError(err?.message || String(err));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email address';
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Message is required';
    else if (message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-8 max-w-xs mx-auto space-y-3 text-black">
        <input
          className="border border-white rounded-md p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={e => {
            setName(e.target.value);
            setErrors(prev => { const copy = { ...prev }; delete copy.name; return copy; });
          }}
        />
        {errors.name && <p className="text-red-500 text-sm text-start">{errors.name}</p>}

        <input
          className="border border-white rounded-md p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setErrors(prev => { const copy = { ...prev }; delete copy.email; return copy; });
          }}
        />
        {errors.email && <p className="text-red-500 text-sm text-start">{errors.email}</p>}

        <input
          className="border border-white rounded-md p-2 w-full"
          placeholder="Subject"
          value={subject}
          onChange={e => {
            setSubject(e.target.value);
            setErrors(prev => { const copy = { ...prev }; delete copy.subject; return copy; });
          }}
        />
        {errors.subject && <p className="text-red-500 text-sm text-start">{errors.subject}</p>}

        <textarea
          className="border border-white rounded-md p-2 w-full"
          placeholder="Type your message here..."
          rows={4}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
            setErrors(prev => { const copy = { ...prev }; delete copy.message; return copy; });
          }}
        />
        {errors.message && <p className="text-red-500 text-sm text-start">{errors.message}</p>}
        <div className="flex justify-center">
          <button className="bg-black text-white px-4 py-2" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>

      {status === 'success' && <p className="text-center mt-3 text-green-500">Message sent successfully.</p>}
      {status === 'error' && <p className="text-center mt-3 text-red-500">Error sending message: {error}</p>}
    </div>
  );
}
