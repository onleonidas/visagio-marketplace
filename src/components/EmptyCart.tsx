import { GoInbox } from "react-icons/go";

export const EmptyCart = () => {

    return (
        <div className="w-full h-[600px] border rounded-lg flex items-center justify-center">
        <div className="bg-white rounded-lg p-10 flex flex-col justify-between">
            <div className="flex items-center justify-center flex-col gap-5">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                    <GoInbox  className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-[20px] w-60 text-center font-semibold text-gray-700">Seu carrinho está tão vazio... :(</h2>
            </div>
        </div>
        
       </div>
    );
};
