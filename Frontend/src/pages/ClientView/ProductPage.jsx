import MainLayout from "../../components/layout/MainLayout";
import Categories from "../../components/share/Categories";
import Discount from "../../components/share/Discount";
import ProductList from "../../components/share/ProductList";

const ProductPage = () => {
    return (
        <MainLayout title="Product">
            <Discount />
            <Categories />
            <ProductList />
        </MainLayout>
    );
};

export default ProductPage;