import React, { useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { FaTimesCircle } from "react-icons/fa";

export default function ZodInput({ control, fieldName, className, ...props }) {

    const { field, fieldState } = useController({
        control,
        name: fieldName
    });

    const isInvalid = fieldState.invalid && fieldState.isTouched && fieldState.error?.message;

    return (
        <div>
            <input
                className={`py-2 px-4 text-gray-700 border rounded-md ${ isInvalid ? 'border-red-500' : 'border-gray-300' } ${className || ''}`}
                {...field}
                {...props}
            />
            {isInvalid && (
                <p className="flex items-center text-sm mt-1">
                    <FaTimesCircle className="text-red-500 mr-1" />
                    <span className="text-red-500">{fieldState.error?.message}</span>
                </p>
            )}
        </div>
    );
};

export function ZodTextarea({ control, fieldName, className, ...props }) {

    const { field, fieldState } = useController({
        control,
        name: fieldName
    });

    const isInvalid = fieldState.invalid && fieldState.isTouched && fieldState.error?.message;

    return (
        <div>
            <textarea
                className={`py-2 px-4 text-gray-700 border rounded-md ${ isInvalid ? 'border-red-500' : 'border-gray-300' } ${className || ''}`}
                {...field}
                {...props}
            />
            {isInvalid && (
                <p className="flex items-center text-sm">
                    <FaTimesCircle className="text-red-500 mr-1" />
                    <span className="text-red-500">{fieldState.error?.message}</span>
                </p>
            )}
        </div>
    );
};