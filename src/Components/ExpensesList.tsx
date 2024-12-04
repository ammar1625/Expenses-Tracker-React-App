import { useRef, useState } from "react";
import { MouseEvent } from "react";

interface expenses
{
    id:string|undefined;
    description:string|undefined;
    ammount:number|undefined;
    category:string|undefined;
}

interface Props
{
    expensesList:expenses[];
    onExpenseDelete:(expensesList:expenses[])=>void;
}
function ExpensesList({expensesList ,onExpenseDelete }:Props) 
{
  const filterRef = useRef<HTMLSelectElement>(null);
  const deleteBtnRef  =useRef<HTMLButtonElement>(null);
  const [selectedFilter , setSelectedFilter] = useState("");

  function getTotalExpensesAmmount()
  {
      if(expensesList.length===0)
        {
            return 0;
        }
      if(filterRef.current?.value === "All Categories")
        {
            return expensesList.map(ex=>ex.ammount).reduce((acc,cur)=>(acc&&cur!=undefined)?acc+cur:0);
        }
        return expensesList.filter(ex=>ex.category ===filterRef.current?.value).map(ex=>ex.ammount).reduce((acc,cur)=>(acc&&cur!=undefined)?acc+cur:0);
     
            
  }

  function getFilteredExpensesList()
  {
      if(filterRef.current?.value === "All Categories")
        {
            return expensesList;
        }
      return expensesList.filter(ex=>ex.category===filterRef.current?.value);
  }

  function handleExpenseDelete(event:MouseEvent<HTMLButtonElement>)
  {
      const target = event.target as HTMLElement;
      onExpenseDelete(expensesList.filter(ex=>ex.id !== target.dataset.id))
  }

  return (
    <>
    <div className="expenses-list-ctr">
        <select onChange={(event)=>setSelectedFilter(event.target.value)} ref={filterRef} className="input-field drop-down w-[100%] mb-2">
            <option value="All Categories">َAll Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainments">Entertainments</option>
            <option value="Utilities">Utilities</option>
        </select>

        {/* expenses list table */}
        <table className="expenses-table">
            {/* table header part */}
            <tr>
                <th className="table-header-cell">Description</th>
                <th className="table-header-cell">Ammount</th>
                <th className="table-header-cell">Category</th>
                <th className="table-header-cell"></th>

            </tr>
              
                {/* table body part */}
              { getFilteredExpensesList().length>0 && getFilteredExpensesList().map(ex=><tr key={ex.id}>
                <td className="table-cell">{ex.description}</td>
                <td className="table-cell">{"$" +ex.ammount?.toFixed(2)}</td>
                <td className="table-cell">{ex.category}</td>
                <td className="table-cell"><button onClick={handleExpenseDelete} ref = {deleteBtnRef} data-id = {ex.id} className="delete-btn">delete</button></td>
               </tr>)}

             {/* table footer part */}
            <tr>
                <td className="table-cell">Total</td>
                <td className="table-cell">{getFilteredExpensesList().length===0?"$ 0.00":"$"+getTotalExpensesAmmount()?.toFixed(2)}</td>
                <td className="table-cell"></td>
                <td className="table-cell"></td>
            </tr>
           
        </table>
    </div>
    
    </>
  );
}

export default ExpensesList;
