import React from 'react'

import Row from './Row'

export interface TableProps {
  rows: {
    title: string
    login: string
    password: string
    tags?: {
      id: string
      name: string
    }[]
  }[]
}

export function Table({ rows }: TableProps) {
  return (
    <table className="w-full whitespace-nowrap bg-teal-50 bg-opacity-30">
      <tbody className="flex flex-col gap-2">
        {rows ? (
          rows.map((row) => (
            <Row
              key={row.login}
              title={row.title}
              tags={row.tags}
              loginEncrypt={row.login}
              passwordEncrypt={row.password}
            />
          ))
        ) : (
          <p>Nenhuma senha cadastrada</p>
        )}
      </tbody>
    </table>
  )
}
