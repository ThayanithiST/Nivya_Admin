import { AdminLayout } from "@/components/admin-layout"
import { CustomerRegistration } from "@/components/customer-registration"

export default function CustomersPage() {
  return (
    <AdminLayout>
      <CustomerRegistration />
    </AdminLayout>
  )
}
