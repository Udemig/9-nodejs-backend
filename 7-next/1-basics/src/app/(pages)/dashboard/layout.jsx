import Link from "next/link";

// Oluşturulan @slot sayfaları layout'a prop olarak gelir
const Layout = ({ children, notifications, revenue, users }) => {
  return (
    <div>
      <div className="flex justify-center gap-5 text-xl">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/settings">Ayarlar</Link>
      </div>

      <div>
        <div>{children}</div>

        <div className="flex my-10">
          <div className="flex-1">
            <div className="border p-5">{users}</div>
            <div className="border p-5">{revenue}</div>
          </div>

          <div className="border p-5">{notifications}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
