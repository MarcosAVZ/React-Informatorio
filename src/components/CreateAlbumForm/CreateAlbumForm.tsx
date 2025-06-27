import style from './CreateAlbumForm.module.css';
import { useState } from 'react';



function CreateAlbumForm() {

    const [contador, setContador] = useState(0);

    const [username, setUsername] = useState('');

    const [colors, setColors] = useState(['#ffff', '#fff2']);



    const handleSubmit = () =>{setContador(contador + 1);}


    const colorJoined = colors.join();
    const backgroundColor = `linear-gradient(${colorJoined})`;

    const handleDivClick = () => {
        alert('Div clickeado');    
    }

    const handleButtonClick2 = (event: React.MouseEvent) => {
            event.stopPropagation();
            alert('Botón clickeado mas de 5 veces');
    }


    return (
        <div className={style.main} style={{ background: backgroundColor }}>
            <form>
                <label htmlFor="search-username">UserName</label>
                <input type="text" 
                id='search-username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                />

            </form>
            <p>Tu nombre es {username}</p>

            <p>{contador}</p>
            <button 
                onClick={ () => {
                    if(colors.length < 10) {
                        const newColor = [...colors];
                        newColor.push('#ff28ff');
                        setColors(newColor);
                    } 
                    handleSubmit();                  
                }
            }
            
            >
            Contar</button>
            <div className={style.div} onClick={handleDivClick}>
                <button onClick={handleButtonClick2}>Click aquí</button>
            </div>


            <div className={style.main2}>
                

            </div>


            
        </div>
    );
}
export default CreateAlbumForm;