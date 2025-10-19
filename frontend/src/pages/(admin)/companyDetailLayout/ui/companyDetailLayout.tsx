import { Container } from "@/widgets/container/container";
import { Outlet } from "react-router-dom";

export const CompanyDetailLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Container className="">
                <Outlet />
            </Container>
        </div>
    );
};
