import React from 'react'

import Row from './Row'

export function Table() {
  return (
    <table className="w-full whitespace-nowrap bg-teal-50 bg-opacity-30">
      <tbody className="flex flex-col gap-2">
        {Array.from(Array(50)).map((_, index) => (
          <Row
            title="Marketing Keynote Presentation Marketing Marketing Keynote
                Presentation Marketing"
            tags={['Website', 'Marketing', 'Marketing', 'Marketing']}
            loginEncrypt="U2FsdGVkX19a5hU43tJnaspdlY+uFb8isn2h6jiq5XI="
            passwordEncrypt="U2FsdGVkX19+F9VoCVP4T7eC1/lBzQ5l+1Hp7Br+jl4="
            key={index}
          />
        ))}
      </tbody>
    </table>
  )
}
