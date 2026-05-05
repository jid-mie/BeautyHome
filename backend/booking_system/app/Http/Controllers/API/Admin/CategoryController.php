<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json([
                'status' => 'success',
                'data' => $categories
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories,category_name',
            'description' => 'nullable|string',
        ]);

        try {
            $category = Category::create($validated);
            return response()->json([
                'status' => 'success',
                'message' => 'Chuyên mục đã được tạo thành công',
                'data' => $category
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validated = $request->validate([
            'category_name' => 'required|string|max:255|unique:categories,category_name,' . $id . ',category_id',
            'description' => 'nullable|string',
        ]);

        try {
            $category->update($validated);
            return response()->json([
                'status' => 'success',
                'message' => 'Chuyên mục đã được cập nhật thành công',
                'data' => $category
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Chuyên mục đã được xóa thành công'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
