import { Outlet, createRootRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-7xl font-bold text-primary font-display">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">पृष्ठ नहीं मिला · Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">जिस पृष्ठ की आप तलाश कर रहे हैं, वह उपलब्ध नहीं है। · The page you are looking for is not available.</p>
        <Link to="/" className="mt-6 inline-block px-5 py-2.5 rounded-md bg-saffron text-saffron-foreground font-semibold">
          मुख्य पृष्ठ · Home
        </Link>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});
