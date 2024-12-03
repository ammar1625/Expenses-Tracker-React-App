import { FormEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface expenses
{
    id:string|undefined;
    description:string|undefined;
    ammount:number|undefined;
    category:string|undefined;
}

interface Props
{
    expensesList :expenses[];
    onFormSubmit : (expensesList:expenses[])=>void;
}

function ExpensesForm({expensesList ,  onFormSubmit}:Props)
{
    const descriptionRef = useRef<HTMLInputElement>(null);
    const ammountRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);

    const descriptionErrorRef = useRef<HTMLHeadingElement>(null);
    const ammountErrorRef = useRef<HTMLHeadingElement>(null);
    const categoryErrorRef = useRef<HTMLHeadingElement>(null);

   
    function validateFields()
    {
        
        if(descriptionRef.current?.value.length !== undefined)
            {
                if(descriptionRef.current?.value.length < 3)
                    {
                        descriptionErrorRef.current?.classList.add("visible");
                        
                    }
                else
                {
                    descriptionErrorRef.current?.classList.remove("visible");

                }
            }
        if(ammountRef.current?.value.length !== undefined)
            {
                if(ammountRef.current?.value.length <1)
                    {
                        ammountErrorRef.current?.classList.add("visible");
                    }
                else
                {
                    ammountErrorRef.current?.classList.remove("visible");

                }
            }
        if(categoryRef.current?.value === "")
            {
                categoryErrorRef.current?.classList.add("visible");
                
            }
        else
        {
            categoryErrorRef.current?.classList.remove("visible");

        }
        if(descriptionRef.current && ammountRef.current && categoryRef.current)
            return   ((descriptionRef.current?.value.length >= 3)&&(ammountRef.current?.value.length >=1)&&(categoryRef.current?.value !== "")); 

        
    }

    function clearFields()
    {
        if(descriptionRef.current?.value && ammountRef.current?.value && categoryRef.current?.value)
            {
                descriptionRef.current.value ="";
                ammountRef.current.value = "";
                categoryRef.current.selectedIndex = 0
            }
       
    }
    function handlFormSubmit(event:FormEvent)
    {
       
        event.preventDefault();
        if(validateFields())
            {
                
                onFormSubmit([...expensesList , {id:uuidv4() , description:descriptionRef.current?.value , ammount: parseFloat(ammountRef.current?.value) , category:categoryRef.current?.value}]);
                clearFields();
            }

            
    }
    
    return(
        <form onSubmit={handlFormSubmit} className="form">
            <div className="parent-field">
                <div className="field">
                    <label className="lbl">Description</label>
                    <input onInput={validateFields} ref={descriptionRef} className="input-field"  type="text"/>
                </div>
                <h3 ref={descriptionErrorRef} className="error-msg">this should contain at least 3 characters</h3>
            </div>
           
            <div className="parent-field">
                <div className="field">
                    <label className="lbl">Ammount</label>
                    <input onInput={validateFields} ref={ammountRef} className="input-field" type="number"/>
                </div>
                <h3 ref={ammountErrorRef} className="error-msg">you should enter the price</h3>

            </div>
            
            <div className="parent-field">
                <div className="field">
                    <label  className="lbl">Category</label>
                    <select onChange={validateFields}  ref={categoryRef} className="input-field drop-down" >
                        <option value=""></option>
                        <option value="Groceries">Groceries</option>
                        <option value="Entertainments">Entertainments</option>
                        <option value="Utilities">Utilities</option>
                    </select>
                </div>
                <h3 ref={categoryErrorRef} className="error-msg">you should select the category</h3>

            </div>
           

            <button  className="submit-btn" type="submit">Submit</button>
        </form>
    );
}

export default ExpensesForm;