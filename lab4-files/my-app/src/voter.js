import {useState} from "react";


export default function Voter(props) {
    const[score_var, set_score_var]  = useState(0);

    return(
        <div className="Voter">
            <div className="voter-button">
                <button onClick={
                    function() {
                        set_score_var(score_var+1);
                        console.log(score_var);
                    }
                }
                > ^ </button>
            </div>
            
            <div className="voter-score">{score_var}</div>

            <div className="voter-button">
                <button onClick={
                    function() {
                        set_score_var(score_var-1);
                        console.log(score_var);
                    }
                }> v </button>
            </div>
            
        </div>
    )
}
