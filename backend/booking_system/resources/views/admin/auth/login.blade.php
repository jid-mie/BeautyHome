<div style="width: 300px; margin: 100px auto; text-align: center; border: 1px solid #ccc; padding: 20px;">
    <h2>ADMIN LOGIN</h2>
    @if(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif
    <form action="{{ route('admin.login.submit') }}" method="POST">
        @csrf
        <input type="email" name="email" placeholder="admin@gmail.com" required style="width: 100%; margin-bottom: 10px; padding: 8px;">
        <input type="password" name="password" placeholder="123456" required style="width: 100%; margin-bottom: 10px; padding: 8px;">
        <button type="submit" style="width: 100%; padding: 10px; background: blue; color: white; border: none; cursor: pointer;">Đăng nhập</button>
    </form>
</div>