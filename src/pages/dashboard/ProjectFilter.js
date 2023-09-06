import { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('all')

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter)
    changeFilter(newFilter)
  }

  return (
    <div className="project-filter ">
      <nav className='gap-3 sm:gap-0 flex-wrap'>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button key={f}
            onClick={() => handleClick(f)}
            className={`${currentFilter === f ? 'active' : ''} px-3`}
          >{f}</button>
        ))}
      </nav>
    </div>
  )
}