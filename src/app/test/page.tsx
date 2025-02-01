"use client"

import { Button } from '@heroui/button';
import React from 'react';
import Swal from 'sweetalert2';

const Page = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        // buttonsStyling: false
    });

    const handleButton = () => {
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your file is safe :)",
                    icon: "error"
                });
            }
        });
    };

    return (
        <div>
            <Button onPress={handleButton}>Delete</Button>
        </div>
    );
};

export default Page;