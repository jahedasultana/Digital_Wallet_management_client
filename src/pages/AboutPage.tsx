import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">About TrustPay</h1>
          <p className="text-lg text-muted-foreground">
            TrustPay is a secure and user-friendly digital wallet that makes
            everyday payments simple. From sending and receiving money to paying
            bills and managing transactions, TrustPay helps you stay in control
            of your finances anytime, anywhere.
          </p>
          <div className="grid gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                To provide people with a seamless way to store, transfer, and
                access money digitally with complete trust and transparency.
              </CardContent>
            </Card>
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                To revolutionize financial transactions by becoming the most
                trusted digital wallet, empowering users and businesses across
                the globe.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
