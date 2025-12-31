import { Header, Sidebar } from "./components/GenericPage";

export const HomePage = () => {
    return (
        <div className="layout">
            <Sidebar />
            <Header />
            Hello world
        </div>
    );
};
