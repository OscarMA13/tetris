'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <div className='flex justify-center items-center mx-auto h-screen'>
            <Link href="/game">
                <button className='bg-blue-200 text-black w-40 rounded h-20'>Play Tetris</button>
            </Link>
            </div>
        </div>
    );
}
