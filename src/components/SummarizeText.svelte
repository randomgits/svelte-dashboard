<script>
  let summary = '';
  let text = '';

  async function summarize() {
    try {
      const response = await fetch('/summarize_text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const result = await response.json();
      summary = result.summary;
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<textarea bind:value={text} rows="4" cols="50"></textarea>
<button on:click={summarize}>Summarize</button>
{#if summary}
  <div>
    <h2>Summary</h2>
    <p>{summary}</p>
  </div>
{/if}
