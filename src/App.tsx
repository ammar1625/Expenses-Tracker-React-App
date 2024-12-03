import ExpensesForm from "./Components/ExpensesForm";
import ExpensesList from "./Components/ExpensesList";
import { useState } from "react";


interface expenses
{
    id:string|undefined;
    description:string|undefined;
    ammount:number|undefined;
    category:string|undefined;
}

function App() {

 const [expensesList, setExpensesList] = useState<expenses[]>([]);

  return <div >
      <ExpensesForm expensesList={expensesList} onFormSubmit={setExpensesList}/>
      <ExpensesList expensesList={expensesList} onExpenseDelete={setExpensesList}/>
   
     </div>
}

export default App;
