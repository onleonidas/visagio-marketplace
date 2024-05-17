import { Button } from "flowbite-react";
import { MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ConfirmPaymentPage = () => {
    
    const navigate = useNavigate();

    return (
       <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white h-[300px] mx-5 w-[500px] rounded-lg p-10 flex flex-col justify-between">
            <div className="flex items-center justify-center flex-col gap-5">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                    <MdOutlineDone className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-[20px] w-60 text-center font-semibold">Pagamento realizado com sucesso!</h2>
            </div>
            <Button  onClick={() => navigate("/home")} color={"dark"} className="w-full">Continuar comprando</Button>
        </div>
        
       </div>
    );
};

export default ConfirmPaymentPage;
