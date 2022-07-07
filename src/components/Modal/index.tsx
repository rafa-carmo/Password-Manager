import React, { ComponentProps, useState } from 'react'
import Modal from 'react-modal'

type ModalComponentProps = {
  isOpen: boolean
  children: React.ReactNode
} & ComponentProps<typeof Modal>

export default function ModalComponent({
  children,
  isOpen,
  ...props
}: ModalComponentProps) {
  return (
    <Modal
      className="w-full h-full grid place-items-center"
      isOpen={isOpen}
      {...props}
    >
      <div className="w-fit h-fit p-5 rounded-md">{children}</div>
    </Modal>
  )
}
