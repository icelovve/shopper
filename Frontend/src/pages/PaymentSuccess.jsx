import MainLayout from "../components/layout/MainLayout"

const PaymentSuccess = () => {
    return (
        <MainLayout title="Payment was successful">
            <div className="flex flex-col justify-center items-center text-gray-600 bg-white border my-24 mx-40 rounded-lg py-8 mb-8">
                <svg viewBox="0 0 24 24" className="text-green-700 w-32 h-32 mx-auto my-6">
                    <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <h2 className="text-4xl font-bold mb-4 text-gray-700 mt-5">Your payment was successful</h2>
                <p className="mb-1">Thank you for your payment. We will</p>
                <p className="mb-12">be in contact with more details shortly.</p>
            </div>
        </MainLayout>
    )
}

export default PaymentSuccess