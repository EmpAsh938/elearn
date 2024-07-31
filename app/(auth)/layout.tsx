import Image from "next/image"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <section className="min-h-screen overflow-x-hidden grid grid-cols-1 md:grid-cols-3">
                <div className="order-2 md:order-1 col-span-2 flex flex-col gap-4 items-center py-4 px-28">
                    {children}
                </div>
                <aside className="order-1 md:order-2 h-16 md:h-full">
                    <Image src="/images/auth-bg.avif" height={500} width={500} alt="auth background" className="h-full w-full object-cover" />
                </aside>
            </section>
        </main>
    )
}