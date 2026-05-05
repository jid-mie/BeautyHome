<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('category')->get();
        return response()->json(['success' => true, 'data' => $services]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string',
            'category_id' => 'required|exists:categories,category_id',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'data' => $service,
            'message' => 'Tạo dịch vụ thành công.'
        ]);
    }

    public function show($id)
    {
        $service = Service::with('category')->findOrFail($id);
        return response()->json(['success' => true, 'data' => $service]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        
        $validated = $request->validate([
            'service_name' => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,category_id',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'sometimes|integer|min:1',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $service->update($validated);

        return response()->json([
            'success' => true,
            'data' => $service,
            'message' => 'Cập nhật dịch vụ thành công.'
        ]);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa dịch vụ thành công.'
        ]);
    }
}
