import MainLayout from "../../components/layout/MainLayout"
import Map from "../../components/share/Map"
import Contact from "../../components/share/Contact"

const ContactPage = () => {
    return (
        <MainLayout title='Contact Us'>
            <div className="grid grid-cols-1 place-items-center">
                <Contact />  
                <Map />              
            </div>
        </MainLayout>
    )
}

export default ContactPage