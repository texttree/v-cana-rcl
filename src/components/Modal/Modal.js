import React, { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';

function Modal({
  title = '',
  isOpen = false,
  children = null,
  closeHandle = () => {},
  propsClassNames = {},
  handleCloseDisabled = false,
}) {
  const classNames = {
    ...{
      main: 'z-50 relative',
      dialogTitle: 'text-center text-2xl font-medium leading-6',
      dialogPanel:
        'w-full max-w-md p-6 align-middle transform overflow-y-auto shadow-xl transition-all bg-white text-black rounded-3xl',
      transitionChild: 'fixed inset-0 bg-opacity-25 backdrop-brightness-90',
      backdrop: 'inset-0 fixed overflow-y-auto backdrop-blur',
      content: 'flex items-center justify-center p-4 min-h-full',
    },
    ...propsClassNames,
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={classNames.main}
        onClose={() => !handleCloseDisabled && closeHandle()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={classNames.transitionChild} />
        </Transition.Child>
        <div className={classNames.backdrop}>
          <div className={classNames.content}>
            <Transition.Child
              as={Fragment}
              leaveFrom="opacity-100 scale-100"
              enterFrom="opacity-100 scale-95"
              enterTo="opacity-100 scale-100"
              enter="ease-out duration-300"
              leaveTo="opacity-0 scale-95"
              leave="ease-in duration-200"
            >
              <Dialog.Panel className={classNames.dialogPanel}>
                <Dialog.Title as="h3" className={classNames.dialogTitle}>
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default Modal;

Modal.propTypes = {
  // The title of the modal
  title: PropTypes.string.isRequired,
  // Indicates whether the modal is open or not.
  isOpen: PropTypes.bool.isRequired,
  // The content of the modal.
  children: PropTypes.node.isRequired,
  // The function to handle closing the modal.
  closeHandle: PropTypes.func.isRequired,
  // The class names for the modal. Defaults to an empty object.
  className: PropTypes.object,
  //Indicates whether the modal close action is disabled or not. Defaults to false.
  handleCloseDisabled: PropTypes.bool,
};
