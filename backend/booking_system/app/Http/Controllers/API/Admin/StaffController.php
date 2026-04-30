<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Staff;
use Illuminate\Http\Response;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $staff = Staff::with('category')->get();
            return response()->json([
                'status' => 'success',
                'data' => $staff
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,category_id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:staffs,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:20',
        ]);

        try {
            $staff = Staff::create([
                'category_id' => $validated['category_id'],
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'phone' => $validated['phone'],
                'status' => 1, // Default active
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Nhân viên đã được tạo thành công',
                'data' => $staff
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $staff = Staff::findOrFail($id);
        
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,category_id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:staffs,email,' . $id . ',staff_id',
            'password' => 'nullable|string|min:6',
            'phone' => 'nullable|string|max:20',
            'status' => 'nullable|integer',
        ]);

        try {
            $updateData = [
                'category_id' => $validated['category_id'],
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'status' => $validated['status'] ?? $staff->status,
            ];

            if (!empty($validated['password'])) {
                $updateData['password'] = bcrypt($validated['password']);
            }

            $staff->update($updateData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thông tin nhân viên đã được cập nhật',
                'data' => $staff
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $staff = Staff::findOrFail($id);
            $staff->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Nhân viên đã được xóa khỏi hệ thống'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
