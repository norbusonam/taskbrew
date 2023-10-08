import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IconClose } from "./icons";

type Props = {
  isOpen: boolean;
  title: string;
  description?: string;
  hasCloseButton?: boolean;
  children: React.ReactNode;
  closeModal: () => void;
};

export function Modal(props: Props) {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-gray-800"
                  >
                    {props.title}
                  </Dialog.Title>
                  {props.hasCloseButton && (
                    <button
                      onClick={props.closeModal}
                      className="rounded-md p-1 transition-colors hover:bg-gray-200 active:bg-gray-300"
                    >
                      <IconClose className="h-5 w-5" />
                    </button>
                  )}
                </div>
                {props.description && (
                  <Dialog.Description className="text-left text-sm text-gray-400">
                    {props.description}
                  </Dialog.Description>
                )}
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
