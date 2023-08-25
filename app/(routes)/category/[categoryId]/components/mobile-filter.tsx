"use client";

import { useState } from 'react';

import { Plus, X } from 'lucide-react';

import { Color, Size } from "@/types";
import Button from '@/components/ui/button';
import { Dialog } from '@headlessui/react';
import IconButton from '@/components/ui/icon-button';
import Filter from './filter';

interface MobileFilterProps {
    sizes: Size[];
    colors: Color[];
};

const MobileFilter: React.FC<MobileFilterProps> = ({ sizes, colors }) => {

    const [open, setOpen] = useState<boolean>(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button
                className='flex items-center gap-x-2 lg:hidden'
                onClick={onOpen}
            >
                Filters
                <Plus size={20} />
            </Button>

            <Dialog
                as='div'
                open={open}
                onClose={onClose}
                className="relative z-40 lg:hidden"
            >
                {/* Background */}
                <div className='fixed inset-0 bg-black bg-opacity-25' />

                {/* Dialog position */}
                <div className='fixed inset-0 z-40 flex'>
                    <Dialog.Panel
                        className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
                    >
                        {/* Close Button */}
                        <div className='flex items-center justify-end px-4'>
                            <IconButton
                                icon={<X size={25} />}
                                onClick={onClose}
                            />
                        </div>

                        {/* Render the filter */}
                        <div className='p-4'>
                            <Filter
                                valueKey='sizeId'
                                name='Sizes'
                                data={sizes}
                            />
                            <Filter
                                valueKey='colorId'
                                name='Colors'
                                data={colors}
                            />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default MobileFilter;