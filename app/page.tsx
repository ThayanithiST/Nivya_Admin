import { AdminLayout } from "@/components/admin-layout"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  )
}
