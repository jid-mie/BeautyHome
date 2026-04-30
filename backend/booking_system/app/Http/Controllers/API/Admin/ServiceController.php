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
        $request->validate([
            'service_name' => 'required|string',
            'category_id' => 'required|exists:categories,category_id',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $service = Service::create($request->all());

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
        
        $request->validate([
            'service_name' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'duration' => 'sometimes|integer',
        ]);

        $service->update($request->all());

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
