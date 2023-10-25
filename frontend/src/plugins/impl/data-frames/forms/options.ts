/* Copyright 2023 Marimo. All rights reserved. */
export interface FieldOptions {
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  direction?: "row" | "column";
  special?:
    | "column_id"
    | "column_type"
    | "radio_group"
    | "column_filter"
    | "text_area_multiline";
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FieldOptions = {
  of(options: FieldOptions): string {
    return JSON.stringify(options);
  },
  parse(options: string | undefined): FieldOptions {
    if (!options) {
      return {};
    }
    try {
      return JSON.parse(options) as FieldOptions;
    } catch {
      return {
        label: options,
      };
    }
  },
};
