import * as React from "react";
import { format } from "date-fns";
import { File, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ItemCardProps {
  data: {
    id: string;
    created_at: Date;
    size: string;
    description: string;
    amount_final: number;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({ data }) => {
  const parsedCreatedAt = new Date(data.created_at);
  const bytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="py-6 border-b border-gray-300 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <File className="text-zinc-500 mr-3" size={34} />
          <div className="flex flex-col">
            <p className="font-bold">{data.description}</p>
            <p className="text-left">{bytesToMB(Number(data.size))} MB</p>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="text-right gap-1 flex-shrink-0">
            <p className="font-bold">
              {Number(data.amount_final).toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </p>
            <h2>{format(parsedCreatedAt, "dd/MM/yy")}</h2>
          </div>
          <div className="flex flex-col ml-6">
            <Link className="py-2 px-4 bg-transparent text-gray-600 hover:text-gray-800 flex items-center space-x-2" to={`/historico/detalhes?id=${data.id}`}>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ItemCard };
