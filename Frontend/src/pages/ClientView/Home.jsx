import MainLayout from "../../components/layout/MainLayout"
import Categories from "../../components/share/Categories";
import Discount from '../../components/share/Discount';
import TopProduct from "../../components/share/TopProduct";
import RecommendedProduct from "../../components/share/RecommendedProduct";

const Home = () => {
    return (
        <MainLayout title="Home" className="flex flex-col">
            <Discount />
            <Categories />
            <TopProduct />
            <RecommendedProduct />
        </MainLayout>
    )
}

export default Home