import React from 'react';
import logo from './img/logo2.png';
import './App.css';
import Character from './components/Character';
import Comic from './components/Comic';
import Serie from './components/Serie';
import Home from './components/Home';
import CharacterList from './components/CharacterList';
import ComicList from './components/ComicList';
import SerieList from './components/SerieList';
import RNF from './components/RNF';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CharacterSearch from './components/CharacterSearch';
import ComicSearch from './components/ComicSearch';
import SerieSearch from './components/SerieSearch';


const App = () => {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<br/><br/>
					<Link className='showlink' to='/'>
						Home
					</Link>
					<br/><br/>
					<Link className='showlink' to='/characters/page/0'>
						Character List
					</Link>
					<Link className='showlink' to='/comics/page/0'>
						Comic List
					</Link>
					<Link className='showlink' to='/series/page/0'>
						Serie List
					</Link>
					<br/><br/>
					<Link className='showlink' to='/characterSearch'>
						Character Search
					</Link>
					<Link className='showlink' to='/comicSearch'>
						Comic Search
					</Link>
					<Link className='showlink' to='/serieSearch'>
						Series Search
					</Link>
				</header>
				<br />
				<br />
				<div className='App-body'>
					<Route exact path='/' component={Home} />
					<Route exact path='/characters/page/:page' component={CharacterList} />
					<Route exact path='/comics/page/:page' component={ComicList} />
					<Route exact path='/series/page/:page' component={SerieList} />
					<Route exact path='/characters/:id' component={Character} />
					<Route exact path='/comics/:id' component={Comic} />
					<Route exact path='/series/:id' component={Serie} />
					<Route exact path='/characterSearch' component={CharacterSearch} />
					<Route exact path='/comicSearch' component={ComicSearch} />
					<Route exact path='/serieSearch' component={SerieSearch} />
					<Route exact path='/RNF' component={RNF} />
				</div>
			</div>
		</Router>
	);
};

export default App;
