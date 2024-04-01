import { ReactNode } from 'react';
import { useDogs } from './providers/DogProvidor';

export const Section = ({
	label,
	children
}: {
	// No more props than these two allowed
	label: string;
	children: ReactNode;
}) => {
	const { dogs, dogFilter, updateFilter } = useDogs();

	return (
		<section id='main-section'>
			<div className='container-header'>
				<div className='container-label'>{label}</div>
				<div className='selectors'>
					{/* This should display the favorited count */}
					<div
						className={`selector ${
							!dogFilter ? '' : dogFilter === 'liked' ? 'active' : ''
						}`}
						onClick={() => {
							updateFilter('liked');
							alert('click favorited');
						}}>
						favorited ( {dogs.filter((dogs) => dogs.isFavorite === true).length}
						)
					</div>

					{/* This should display the unfavorited count */}
					<div
						className={`selector ${
							!dogFilter ? '' : dogFilter === 'disliked' ? 'active' : ''
						}`}
						onClick={() => {
							updateFilter('disliked');
							alert('click unfavorited');
						}}>
						unfavorited (
						{dogs.filter((dogs) => dogs.isFavorite === false).length} )
					</div>
					<div
						className={`selector ${
							!dogFilter ? '' : dogFilter === 'create' ? 'active' : ''
						}`}
						onClick={() => {
							updateFilter('create');
							alert('click create dog');
						}}>
						create dog
					</div>
				</div>
			</div>
			<div className='content-container'>{children}</div>
		</section>
	);
};
