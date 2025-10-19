import { AdminSidebar } from "@/entities/dashboard/ui/adminMenu";
import { Container } from "@/widgets/container/container";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Container className="">
        <h1 className="text-3xl font-light text-gray-800 pb-4 pl-4">
          Администрирование
        </h1>
        <div className="flex gap-2">
          <AdminSidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
