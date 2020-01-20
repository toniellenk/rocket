import React, { useEffect, useState } from 'react';

import './styles.css'

function DevForm({ onSubmit }) {

    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (erro) => {
                console.log(erro);
            },
            {
                timeout: 30000
            }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit(
            {
                github_username,
                techs,
                latitude,
                longitude
            }
        );

        setGithub_username('');
        setTechs('');
    };

    return <form onSubmit={handleSubmit}>
        <div className='input-block'>
            <label htmlFor='github_username'>Usuário Github</label>
            <input name='github_username'
                id='github_username'
                required
                value={github_username}
                onChange={e => setGithub_username(e.target.value)}></input>
        </div>

        <div className='input-block'>
            <label htmlFor='techs'>Tecnologias</label>
            <input name='techs'
                id='techs'
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}></input>
        </div>

        <div className='input-group'>
            <div className='input-block'>
                <label htmlFor='latitude'>Latitude</label>
                <input type='number'
                    name='latitude'
                    id='latitude'
                    required
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}></input>
            </div>

            <div className='input-block'>
                <label htmlFor='logitude'>Longitude</label>
                <input type='number'
                    name='logitude'
                    id='logitude'
                    required
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}></input>
            </div>
        </div>

        <button type='submit'>Salvar</button>

    </form>
};

export default DevForm;