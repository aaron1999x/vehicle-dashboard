export type ApprovalStatus = 0 | 1 | 2 | 3; // 0 = Draft, 1 = Approved, 2 = Pending, 3 =
export type VehicleStatus = 0 | 1 | 2; // 0 = Active, 1 = Inactive, 2 = Decommissioned

export type Pagination = {
  page: number;
  limit: number;
};

export type SortBy = {
  field: 'mtime' | 'license_plate'; // Restricting to allowed fields
  order_type: 0 | 1; // 0 = Ascending, 1 = Descending
};

export interface VehicleRequest {
  vehicle_type: string; // Van, Car, Bus, etc.
  passenger_capacity_min: number;
  passenger_capacity_max: number;
  approval_status: ApprovalStatus;
  vehicle_status: VehicleStatus;
  mtime_from: number; // Unix timestamp
  mtime_to: number; // Unix timestamp
  license_plate: string;
  pagination_info: Pagination;
  sort_by: SortBy[];
}

export interface VehicleBody {
  vehicle_type: string; // Van, Car, Bus, etc.
  passenger_capacity_min: number;
  passenger_capacity_max: number;
  approval_status: string;
  vehicle_status: string;
  mtime_from: number; // Unix timestamp
  mtime_to: number; // Unix timestamp
  license_plate: string;
  pagination_info: Pagination;
  sort_by: SortBy[];
}
