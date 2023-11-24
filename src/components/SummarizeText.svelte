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

<div class="form-control">
  <textarea class="textarea textarea-bordered h-24" bind:value={text} placeholder="Enter text"></textarea>
  <button class="btn btn-primary" on:click={summarize}>Summarize</button>
</div>

{#if summary}
  <div class="alert alert-success">
    <div class="flex-1">
      <label>Summary</label>
      <p>{summary}</p>
    </div>
  </div>
{/if}