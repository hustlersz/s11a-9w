export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center mb-12">Support</h1>
      <div className="max-w-2xl mx-auto text-center bg-card border-border p-8 rounded-lg shadow-sm">
        <p className="text-lg mb-4">For any questions or assistance, please contact us.</p>
        <p className="text-xl font-semibold mb-2">Email: support@chromehearts.com</p>
        <p className="text-xl font-semibold mb-6">Phone: 123-456-7890</p>
        <p className="text-muted-foreground">Our support team will respond to you as soon as possible.</p>
      </div>
    </div>
  )
}
