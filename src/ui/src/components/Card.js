export default function InfoCard({text}) {
    return (
        <div class="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 text-center">
            <div class="p-6">
                <p class="mb-2 text-base text-neutral-500 dark:text-neutral-300">
                    {text}
                </p>
            </div>
        </div>
    );
}